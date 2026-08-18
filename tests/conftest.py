"""Shared pytest fixtures for CronixUI tests."""

import sys
import os
from pathlib import Path

import pytest

# Add the python package to the path so we can import cronixui
PYTHON_PACKAGE_PATH = Path(__file__).parent.parent / "packages" / "python"
sys.path.insert(0, str(PYTHON_PACKAGE_PATH))


@pytest.fixture
def xdisplay():
    """Provide a virtual display for tkinter tests.
    
    On CI (GitHub Actions), this uses Xvfb.
    On local development, it skips if no display is available.
    """
    # Check if we're on CI or have a display
    if os.environ.get('CI') or os.environ.get('DISPLAY'):
        yield
        return
    
    # Try to set up Xvfb for headless testing
    try:
        import subprocess
        # Check if Xvfb is available
        result = subprocess.run(['which', 'Xvfb'], capture_output=True, text=True)
        if result.returncode == 0:
            # Start Xvfb
            display = ':99'
            proc = subprocess.Popen(
                ['Xvfb', display, '-screen', '0', '1024x768x24'],
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL
            )
            os.environ['DISPLAY'] = display
            import time
            time.sleep(0.5)
            yield
            proc.terminate()
            return
    except Exception:
        pass
    
    # Skip if no display available
    pytest.skip("No display available for tkinter tests")


@pytest.fixture
def sample_html_content():
    """Provide sample HTML content for testing."""
    return "<div class='container'><p>Hello World</p></div>"


@pytest.fixture
def sample_component_data():
    """Provide sample component data for testing."""
    return {
        "title": "Test Component",
        "body": "Test content",
        "variant": "primary",
        "size": "md",
    }
